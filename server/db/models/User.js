const conn = require("../conn");
const { STRING, UUID, UUIDV4, BOOLEAN } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT = process.env.JWT;

const User = conn.define("user", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Username required.",
      },
    },
    unique: true,
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Password required.",
      },
    },
  },
  // shippingAddress: {
  //   type: STRING,
  // },
  admin: {
    type: BOOLEAN,
    defaultValue: false,
  },
});

User.prototype.createOrder = async function () {
  const cart = await this.getCart();
  cart.isCart = false;
  await cart.save();
  return cart;
};

// need to test - should be successful - AG
User.prototype.getOrders = async function () {
  let orders = await conn.models.order.findAll({
    where: {
      userId: this.id,
      isCart: false,
    },
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  });
  return orders;
};

User.prototype.getAddresses = async function () {
  let addresses = await conn.models.address.findAll({
    where: {
      userId: this.id,
    },
  });
  return addresses;
};

User.prototype.createAddress = async function (_address) {
  let address = await conn.models.address.create({
    streetAddress: _address.streetAddress,
    city: _address.city,
    apt: _address.apt,
    state: _address.state,
    zipCode: _address.zipCode,
    userId: this.id,
  });
  return address;
};

User.prototype.getCart = async function () {
  let cart = await conn.models.order.findOne({
    where: {
      userId: this.id,
      isCart: true,
    },
  });
  if (!cart) {
    cart = await conn.models.order.create({
      userId: this.id,
    });
  }
  cart = await conn.models.order.findByPk(cart.id, {
    include: [
      {
        model: conn.models.lineItem,
        include: [conn.models.product],
      },
    ],
  });
  return cart;
};

User.prototype.addToCart = async function ({ product, quantity }) {
  const cart = await this.getCart();
  let lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  if (lineItem) {
    lineItem.quantity += quantity;
    await lineItem.save();
  } else {
    await conn.models.lineItem.create({
      orderId: cart.id,
      productId: product.id,
      quantity,
    });
  }
  return this.getCart();
};

User.prototype.removeFromCart = async function ({ product, quantityToRemove }) {
  const cart = await this.getCart();
  const lineItem = cart.lineItems.find((lineItem) => {
    return lineItem.productId === product.id;
  });
  lineItem.quantity = lineItem.quantity - quantityToRemove;
  if (lineItem.quantity > 0) {
    await lineItem.save();
  } else {
    await lineItem.destroy();
  }
  return this.getCart();
};

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  console.log(token);
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

User.register = async function (credentials) {
  const user = await this.create(credentials);
  return user.generateToken();
};

module.exports = User;
