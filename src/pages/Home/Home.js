import styles from './Home.module.scss';
import Video from '~/components/Video/Video';
import { useState } from 'react';
import classNames from 'classnames/bind';

import download from"~/assets/videos/Download.mp4"
import download1 from"~/assets/videos/Download (1).mp4"
import download2 from"~/assets/videos/Download (2).mp4"
import download3 from"~/assets/videos/Download (3).mp4"
import download4 from"~/assets/videos/Download (4).mp4"
const cx = classNames.bind(styles);
const dataVideos = [
    {
        id: 1,
        likeCount: "161.1k",
        commentCount: "1238",
        shareCount: "8034",
        src: download,
        description: "",
        tagTopic: "#CapCut #cat #tiktok #fyp #mèo #cats #catsoftiktok",
        musicLink: "nhạc nền - MiNi Anti",


        user: {
            name: "Lan là con trai",
            nickName: "quanglanbui",
            avatar: "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/d427cb356d6b2d79005fde9f642f3d7a~c5_100x100.jpeg?x-expires=1683871200&x-signature=jDn0QSFgo94ZhkG%2FxN%2Bdfei8rFA%3D"
        }
    },
    {
        id: 2,
        likeCount: "233",
        commentCount: "123",
        shareCount: "29",
        src: download1,
        description: "Cuteness overload. 🐈‍⬛🥰🥰🥰",
        tagTopic: "#cat #catsoftiktok #cats #catlover #cattok #kitty #kittycat #kitten #kittensoftiktok #kittens #cutecat #cutepet #pet #petsoftiktok #fyp #foryou",
        musicLink: "哆啦B梦 - 桃子鳄了",

        user: {
            name: "mrcat_kitty",
            nickName: "mrcat_kitty",
            avatar: "https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/a50f347595954adce43ceec541ab3e4a~c5_100x100.jpeg?x-expires=1683871200&x-signature=sc%2FMA3lL8OZy2ufa7CVxCcG4DyI%3D"
        }
    },
    {
        id: 3,
        likeCount: "28,6k",
        commentCount: "669",
        shareCount: "4803",
        src: download2,
        description: "Trả lời @chloe_est_très_belle cảm ơn các bạn đã giới thiệu cho mình một quán cafe mèo mớiii",
        tagTopic: " #coffee #foryou #fyp #hanoi",
        musicLink: "nhạc nền - Be My Coffee",

        user: {
            name: "Be My Coffee",
            nickName: "bemycoffee",
            avatar: "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/78698af18b2ad1df6582b3df33055697.jpeg?x-expires=1683871200&x-signature=wYOcQtUyX0LZYe50iEpY2yKRQEM%3D"
        }
    },
    {
        id: 4,
        likeCount: "193.6k",
        commentCount: "2296",
        shareCount: "26.2k",
        src: download3,
        description: "Big cute eyes😍",
        tagTopic: "#catsoftiktok #CatLovers #CuteCat #foryou #fyp #pet #cute",
        musicLink: "cupid twin version - ⟡ TRACYTRACKS ⟡",

        user: {
            name: "Ledo",
            nickName: "charlottejiahui",
            avatar: "https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/702037100a6267c822fcf043fe4a3039.jpeg?x-expires=1683871200&x-signature=7ocn05gatHGpOZt0CM5oAi5s5fA%3D"
        }
    },
    {
        id: 5,
        likeCount: "62.9k",
        commentCount: "545",
        shareCount: "2282",
        src: download4,
        description: "Bỏ làm sao được hả em, nó ăn zô trong máo em rồi 😥",
        tagTopic: "#cat #catsoftiktok #cats #catlover #cattok #kitty #kittycat #kitten #kittensoftiktok #kittens #cutecat #cutepet #pet #petsoftiktok #fyp #foryou",
        musicLink: "nhạc nền - Nhà có nuôi mèo 🙀",

        user: {
            name: "JustDian",
            nickName: "itsjustduyanh",
            avatar: "https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/3f2c283416db42af9efc767df6f54e71~c5_100x100.jpeg?x-expires=1683871200&x-signature=npxrd1nYF%2BLJtt41x6twH2PYno0%3D"
        }
    },

]

function Home() {

    const [volumeValue, setVolumeValue] = useState("20")
    const [oldVolume, setOldVolume] = useState(volumeValue)


    const handleInputChange = (e) => {
        let target = e.target


        const min = target.min
        const max = target.max
        const val = target.value

        target.style.backgroundSize = (val - min) * 100 / (max - min) + '% 100%'
        setVolumeValue(target.value)
    }




    return (
        <div className={cx('wrapper')}>
            {dataVideos.map(item => {
                    if (item.id === 1) {
                        return <Video key={item.id} idvideo="firstVideo" data={item} onchange={handleInputChange} volumeValue={volumeValue}
                                      setVolume={setVolumeValue}
                                      setOldVolume={setOldVolume}
                                      oldVolume={oldVolume}
                        />
                    } else {
                        return <Video key={item.id} data={item} onchange={handleInputChange} volumeValue={volumeValue}
                                      setVolume={setVolumeValue}
                                      setOldVolume={setOldVolume}
                                      oldVolume={oldVolume}
                        />
                    }

                }
            )}

        </div>
    );
}

export default Home;