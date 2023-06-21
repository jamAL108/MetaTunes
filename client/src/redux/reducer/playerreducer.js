import {
    SETPLAYING,
    CURRENTINDEX,
    SETCURRENTTRACK,
    SETTRACKLIST,
    RESET,
    NEXTTRACK,
    PREVTRACK,
     PLAYTRACK
} from '../playertypes';

const track = JSON.parse(localStorage.getItem("play"));
const tracks = JSON.parse(localStorage.getItem("tracks"));
const playing = JSON.parse(localStorage.getItem("playing"));
const initialState = {
	currentTrack:track,
	isPlaying: playing,
	currentIndex: 0,
	trackList: tracks,
	repeatStatus: "OFF",
};



const player =(state=initialState , action) =>{
    switch(action.type){
        case RESET:
            return{
                currentTrack: null,
                isPlaying: false,
                currentIndex: 0,
                trackList: [],
                repeatStatus: "OFF",
            }
        case  SETPLAYING:
            const daata = action.payload
            localStorage.setItem("playing",JSON.stringify(daata));
            return{
                ...state , isPlaying:action.payload
            }
        case CURRENTINDEX:
            return{
                ...state , currentIndex:action.payload
            }
        case PLAYTRACK:
            const daataa = true;
            localStorage.setItem("playing",JSON.stringify(daataa));
            return{ ...state ,
                currentTrack:action.payload,
                isPlaying:true
            }
        case  SETTRACKLIST:
            console.log(action.payload)
            localStorage.setItem("tracks",JSON.stringify(action.payload.list));
            return{ ...state ,
                trackList:action.payload.list,
                currentIndex:action.payload.index ? action.payload.index : 0
            }    
        case SETCURRENTTRACK:
            console.log(action.payload)
            localStorage.setItem("play",JSON.stringify(action.payload));
            return{
                ...state , currentTrack:action.payload
            }     
        case NEXTTRACK:
            if (state.currentIndex >= state.trackList.length - 1) {
                return{
                    ...state ,currentIndex:0,
                    currentTrack:state.trackList[0]
                }
			} else {
				return{
                    ...state , currentTrack:state.trackList[state.currentIndex + 1],
                    currentIndex:state.currentIndex+1
                }
			}
        case PREVTRACK:
            if (state.currentIndex === 0) {
				return{
                    ...state , currentIndex:state.trackList.length - 1,
                    currentTrack:state.trackList[state.trackList.length - 1]
                }
			} else {
                return{ ...state , 
            currentTrack:state.trackList[state.currentIndex - 1],
                currentIndex:state.currentIndex-1
                }
			}            
            default:
                return state;    
    }
}
export default player;