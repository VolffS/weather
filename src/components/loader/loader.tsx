import './loader.scss';

export const Loader = ({size}: {size: number}) => {
	return (
		<div className="loading-container">
			<div
				className="loading-spinner"
				style={{width: size, height: size}}
			></div>
		</div>
	);
};
export const LoaderCountrySearch = ({size}: {size: number}) => {
	return (
		<div className="country-search__result">
			<div className="loading-container">
				<div
					className="loading-spinner"
					style={{width: size, height: size}}
				></div>
			</div>
		</div>
	);
};
