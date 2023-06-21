const TrackDetails = ({ track }) => {
	return (
		<div className="songdetails">
			<div className="image">
			<img
				src={track?.imageURL}
				alt={track?.title}
			/>
			</div>
			<div className="names">
				<h1>
					{track?.title}
				</h1>
				<h1>
					{track?.artistes.join(", ")}
				</h1>
			</div>
		</div>
	);
};

export default TrackDetails;