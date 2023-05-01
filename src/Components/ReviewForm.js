import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addReview } from '../store/reviews';

const ReviewForm = ({ productId }) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');

	const create = async (ev) => {
		ev.preventDefault();
		const review = {
			title,
			productId,
		};
		await dispatch(addReview(review));
		setTitle('');
	};

	return (
		<form onSubmit={create}>
			<label htmlFor="title">Title</label>
			<input
				type="text"
				name="title"
				value={title}
				onChange={(event) => setTitle(event.target.value)}
			/>
			<button type="submit">Submit</button>
		</form>
	);
};

export default ReviewForm;
