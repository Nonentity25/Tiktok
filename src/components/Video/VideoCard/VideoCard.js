import classNames from "classnames/bind";
import styles from '../Video.module.scss'
import { useEffect, useRef, useState } from "react";
import { useElementOnScreen } from "~/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlagCheckered, faPause, faPlay, faVolumeHigh, faVolumeTimes } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles)



function VideoCard({ src, onchange, volumeValue, setVolume, setOldVolume, oldVolume }) {

    const volumeVal = volumeValue / 100

    const [playing, setPlaying] = useState(false);
    const [sound, setSound] = useState(true)


    const videoRef = useRef();
    const inputRef = useRef()

    if (videoRef.current) {
        videoRef.current.onplay = () => {
            setPlaying(true)
        }

        videoRef.current.onpause = () => {
            setPlaying(false)
        }
    }

    const handlePlayPause = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };
    const options = {
        root: null,
        rootMargin: "-20%",
        threshold: 0.4,
    };
    const isVisibile = useElementOnScreen(options, videoRef);

    useEffect(() => {

        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                videoRef.current.volume = volumeVal
                inputRef.current.style.backgroundSize = volumeValue + '% 100%'
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }// eslint-disable-next-line
    }, [isVisibile]);



    //set volume

    const handleSetsound = () => {
        setSound(!sound)


        if (!sound) {
            setVolume(oldVolume)
            inputRef.current.style.backgroundSize = oldVolume + '% 100%'
        } else {
            inputRef.current.style.backgroundSize = "0% 100%"
            setOldVolume(volumeValue)
            setVolume(0)
        }

    }
    useEffect(() => {
        videoRef.current.volume = volumeVal
        if (volumeValue === 0) {
            setSound(false)
        } else if (volumeValue > 0) {
            setSound(true)
        }// eslint-disable-next-line
    }, [volumeValue])




    return <div className={cx('card-container')}>
        <video className={cx('video')} src={src} loop ref={videoRef}  muted
        />
        <p className={cx('report')}>
            <FontAwesomeIcon icon={faFlagCheckered} className={cx('flag-icon')} />
            Report
        </p>
        <div className={cx('play-or-pause')} onClick={handlePlayPause}>
            {
                !playing ? <FontAwesomeIcon icon={faPlay} className={cx('play-icon')} /> : <FontAwesomeIcon icon={faPause} className={cx('play-icon')} />
            }
        </div>
        <div className={cx('video-sound')}>

            <div onClick={handleSetsound}>
                {
                    sound ? <FontAwesomeIcon icon={faVolumeHigh} className={cx('volume-icon')} /> : <FontAwesomeIcon icon={faVolumeTimes} className={cx('volume-icon')} />
                }
            </div>
            <div className={cx('volume-container')}>
                <input type="range" className={cx('input-range')} value={volumeValue} min="0" max="100" onChange={onchange} ref={inputRef} />

            </div>
        </div>

    </div>
}

export default VideoCard;