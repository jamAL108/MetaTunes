// import { Button, Flex, Hide } from "@chakra-ui/react";
import { AiFillPauseCircle, AiFillPlayCircle } from "react-icons/ai";
import {
	TbArrowsShuffle,
	TbPlayerTrackNextFilled,
	TbPlayerTrackPrevFilled
} from "react-icons/tb";
import { useDispatch } from "react-redux";

const PlayControls = ({
	onNext,
	onPrevious,
	onPlay,
	isPlaying,
	repeatStatus,
}) => {
	console.log(repeatStatus);
	// const dispatch = useDispatch();
	return (
		<div className="playcontrols"
			// align="center"
			// justify="center"
			// gap={{ base: 1, md: 6 }}
			// ml={{ base: 8, md: 0 }}
			>
			{/* <Hide below="md">
				<Button
					color="zinc.600"
					variant="unstyled"
					display="inline-flex"
					alignItems="center"
					justifyContent="center">
					<TbArrowsShuffle color="inherit" size={16} />
				</Button>
			</Hide> */}
			<button
				onClick={onPrevious}>
				<TbPlayerTrackPrevFilled />
			</button>
			<button
				onClick={onPlay}>
				{!isPlaying ? <AiFillPlayCircle /> : <AiFillPauseCircle />}
			</button>
			<button
				onClick={onNext}>
				<TbPlayerTrackNextFilled size={16} />
			</button>
			{/* <Hide below="md">
				<Button
					onClick={() => dispatch(toggleRepeat())}
					color={repeatStatus == "OFF" ? "zinc.600" : "accent.light"}
					variant="unstyled"
					display="inline-flex"
					alignItems="center"
					justifyContent="center">
					{repeatStatus === "OFF" ? (
						<TbRepeatOff color="inherit" size={18} />
					) : repeatStatus === "SINGLE" ? (
						<TbRepeatOnce color="inherit" size={18} />
					) : (
						<TbRepeat color="inherit" size={18} />
					)}
				</Button>
			</Hide> */}
		</div>
	);
};

export default PlayControls;