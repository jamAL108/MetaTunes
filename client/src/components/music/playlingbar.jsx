// import {
// 	Box,
// 	Flex
// 	SliderThumb,
// 	SliderTrack,
// 	Text,
// } from "@chakra-ui/react";
// import Slider from '@mui/material/Slider';
// import { BsSoundwave } from "react-icons/bs";
// import { convertToMins } from "../../utils";

// const PlayingBar = ({ time, track, onSeek, trackRef }) => {
// 	return (
// 		<Flex justifyContent="space-between" gap={3}>
// 			<h1 fontSize="xs" color="zinc.500">
// 				{trackRef ? convertToMins(trackRef.currentTime) : "0:00"}
// 			</h1>
// 			<Slider
// 				outline={0}
// 				_focus={{ outline: 0 }}
// 				aria-label="seek-slider"
// 				defaultValue={0}
// 				width="15rem"
// 				onChange={onSeek}
// 				value={!isNaN(time) ? time : 0}>
// 				<SliderTrack bg="gray.400">
// 					<SliderFilledTrack bg="accent.light" />
// 				</SliderTrack>
// 				<SliderThumb boxSize={3} outline={0}>
// 					<Box color="tomato" as={BsSoundwave} />
// 				</SliderThumb>
// 			</Slider>
// 			<Slider
//                 aria-label="time-indicator"
// 				defaultValue={0}
// 				value={!isNaN(time) ? time : 0}
// 				onChange={onSeek}
//                 getAriaValueText={valuetext}
//                 color="secondary"
//                                            />
// 			<h1 fontSize="xs" color="zinc.500">
// 				{track?.duration.split(".").join(":")}
// 			</h1>
// 		</Flex>
// 	);
// };

// export default PlayingBar;