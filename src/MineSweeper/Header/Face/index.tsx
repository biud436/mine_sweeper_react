import { memo, MutableRefObject, useContext, useEffect, useMemo, useRef, useState } from "react";
import StatusContext from "../../Context";
import Styles  from '../../CSS/MineSweeper.module.css'
import { Status, StatusContextType, StatusType } from "../../types";


type FaceType = "default" | "default2" | "sad";

const IdleFace = () => {

    const faceArray = useRef<FaceType[]>(["default","default2","sad"]);
    const [face,setFace] = useState<FaceType>("default");

    useEffect(() => {
        const interval = setInterval(() => {
            setFace(faceArray.current[parseInt(`${Math.random() * 3}`)]);

        },1500)
        return () => {
            clearInterval(interval);
        }
    },[])

    return <img src={`icon/${face}.png`} alt="" id={Styles.MineSweeperFace} />;

}

const Face = () => {

    const context = useContext<StatusContextType>(StatusContext);

    const [status,SetFaceStatus] = useState<StatusType>(context.Status.current.Status);
    const SetStatus = () => SetFaceStatus(context.Status.current.Status);

    useEffect(() => {
        console.log("Face 렌더링");    
        if(!context.Status.current.SetStatus) context.Status.current.SetStatus = [];
        context.Status.current.SetStatus.push(SetStatus);
    },[])
  

    switch (status) {
        case "Idle":
            return (<IdleFace />);
        case "OnMouse":
            return (<img src={"icon/surprised.png"} alt="" id={Styles.MineSweeperFace} />)
        case "Death":
            return (<img src={"icon/death.png"} alt="" id={Styles.MineSweeperFace} />)
    }

}


export default Face;