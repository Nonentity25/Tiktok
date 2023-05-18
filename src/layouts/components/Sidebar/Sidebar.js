import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
    HashtagIcon,
    MusicIcon
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview/AccountPreview';
import { useEffect, useState } from 'react';
import { useDebounce } from '~/hooks';

const cx = classNames.bind(styles);

const dataAccountSuggested = [
    {
        id: 1,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/65d3c6b1d1e205c75536ccf1f26d552d~c5_100x100.jpeg?x-expires=1684346400&x-signature=%2BYrPtRMA0ahr7Vw5c59MjndyDdU%3D',
        name: 'Theanh28 Entertainment',
        nickName: 'theanh28entertainment',
        blueTick: true,
        folowers: '9M',
        likes: '763.3M'
    },
    {
        id: 2,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/c0e5acb353efad347ae0ba5a87574f1d~c5_100x100.jpeg?x-expires=1684346400&x-signature=TzD%2FTYXfcqP8RV92eFOJOOt%2FAOE%3D',
        name: 'Tiin.vn',
        nickName: 'tiin.vn',
        blueTick: true,
        folowers: '8.4M',
        likes: '538.7'
    },
    {
        id: 3,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/f90cc529e5bacc99b1459a81ab73ca87~c5_100x100.jpeg?x-expires=1684346400&x-signature=bDeUScT2eFwQwBrjPBR531gDxSU%3D',
        name: '🔥Đạt Villa🔥',
        nickName: 'datvilla94',
        blueTick: true,
        folowers: '8.1M',
        likes: '308.3M'
    },
    {
        id: 4,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-maliva-avt-0068/42a81079b5885e152707b170d63ba2df~c5_100x100.jpeg?x-expires=1684346400&x-signature=HQjYBY5Mise1u2085mFQUw93s%2BI%3D',
        name: 'Đào Lê Phương Hoa',
        nickName: 'hoaa.hanassii',
        blueTick: true,
        folowers: '14.4M',
        likes: '367.2M'
    },
    {
        id: 5,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ff6cfa684d7eb1c00409c4214d8ab62f~c5_100x100.jpeg?x-expires=1684346400&x-signature=wDznQ%2BgmWBu64TQpdDUfCrryFb0%3D',
        name: 'VTV24',
        nickName: 'vtv24news',
        blueTick: true,
        folowers: '6M',
        likes: '187.7M'
    },
    {
        id: 6,
        avatar: 'https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/0ba6c8ba9eed06771b9ab7bfb5df5389~c5_100x100.jpeg?x-expires=1684346400&x-signature=kfVLfze0S3UKEjgyHl7HXTQkl0o%3D',
        name: 'VN NGÀY NAY',
        nickName: 'vnnn.official',
        blueTick: true,
        folowers: '5.1M',
        likes: '183.4M'
    },
    {
        id: 7,
        avatar: 'https://p16-sign-useast2a.tiktokcdn.com/tos-useast2a-avt-0068-giso/aee057941301af2efecea5e2f7906c34~c5_100x100.jpeg?x-expires=1684346400&x-signature=2mNgXg9lO0P3KymbyuU3Mxf9maM%3D',
        name: 'CiiN',
        nickName: 'cciinnn',
        blueTick: true,
        folowers: '10.4M',
        likes: '272.5M'
    },
    {
        id: 8,
        avatar: 'https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/b32c566cb8a23dd44c1572248a108bc7.jpeg?x-expires=1684346400&x-signature=oPaZis2qDmVee99BXHAeHgMhs0I%3D',
        name: 'Fun fact',
        nickName: 'funfact.66',
        blueTick: false,
        folowers: '4.6M',
        likes: '108.8M'
    },
    {
        id: 9,
        avatar: 'https://p9-sign-sg.tiktokcdn.com/aweme/100x100/tos-alisg-avt-0068/46105758ab0606521f48fb6e8e88f027.jpeg?x-expires=1684346400&x-signature=Q98JfyWlWoYY9gEmdwPP%2FNsgjDw%3D',
        name: 'HAT Snow',
        nickName: 'hat590',
        blueTick: false,
        folowers: '4.1M',
        likes: '265.7M'
    },
    {
        id: 10,
        avatar: 'https://p9-sign-sg.tiktokcdn.com/aweme/100x100/tiktok-obj/1665757201241090.jpeg?x-expires=1684346400&x-signature=QfBJOw7Svo%2BVo5g%2BXEyYcz%2BW3ZU%3D',
        name: 'Ngô Đức Duy',
        nickName: 'duyyy.real.channel',
        blueTick: true,
        folowers: '6.5M',
        likes: '259.4M'
    },

]
function Sidebar({ shrink }) {
    const [userPreview, setUserPreview] = useState()
    const [showhide, setShowhide] = useState(false)
    const [style, setStyle] = useState()
    const [preview, setPreview] = useState(false)
    const [userID, setUserID] = useState('')
    const [keepUserID, setKeepUserID] = useState('')
    const [event, setEvent] = useState()
    const deBouncedValue = useDebounce(userID, 200);

    const handleShowPreview = e => {
        setPreview(true)

        if (e.target.tagName === 'DIV' && e.target.getAttribute("iduser")) {
            setEvent(e)
            setUserID(e.target.getAttribute("iduser"))
            setKeepUserID(e.target.getAttribute("iduser"))
        } else {
            setUserID(null)
        }
    }


    const handleHidePreview = e => {
        setPreview(false)
        setUserID(false)
    }

    useEffect(() => {
        if (preview) {
            const [data] = dataAccountSuggested.filter(user => user.id == keepUserID)
            setUserPreview(data)
            setShowhide(true)
            if (event && event.pageY) {
                setStyle(event.pageY)
            }
        } else {
            setShowhide(false)
        }
    }, [deBouncedValue]);

    return (
        <div className={cx('inner')}>
        <aside className={cx('wrapper',{ shrink: shrink })}>
            <Menu>
                <MenuItem title="For You" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.routes.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestedAccounts label="Suggested accounts" onMouseleave={handleHidePreview} onMouseenter={handleShowPreview} data={dataAccountSuggested} />
    {showhide && <AccountPreview data={userPreview} style={style} onMouseenter={handleShowPreview} onMouseleave={handleHidePreview} />}
            <div className={cx('discover')}>
                <p className={cx('title')}>Discover</p>
                <div className={cx('discover-list')}>
                    <div className={cx('hashtag')}>
                        <HashtagIcon />
                        <p className={cx('text')}>suthatla</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <HashtagIcon />
                        <p className={cx('text')}>mackedoi</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <HashtagIcon />
                        <p className={cx('text')}>sansangthaydoi</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <MusicIcon width='1.6rem' height='1.6rem' />
                        <p className={cx('text')}>Yêu Đơn Phương Là Gì (MEE Remix) - Mee Remix sdaak</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <MusicIcon width='1.6rem' height='1.6rem' />
                        <p className={cx('text')}>Về Nghe Mẹ Ru - NSND Bach Tuyet &amp; Hứa Kim Tuyền &amp; 14 Casper &amp; Hoàng Dũng</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <MusicIcon width='1.6rem' height='1.6rem' />
                        <p className={cx('text')}>Thiên Thần Tình Yêu - RICKY STAR</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <HashtagIcon />
                        <p className={cx('text')}>7749hieuung</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <HashtagIcon />
                        <p className={cx('text')}>genzlife</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <MusicIcon width='1.6rem' height='1.6rem' />
                        <p className={cx('text')}>Tình Đã Đầy Một Tim - Huyền Tâm Môn</p>
                    </div>
                    <div className={cx('hashtag')}>
                        <MusicIcon width='1.6rem' height='1.6rem' />
                        <p className={cx('text')}>Thằng Hầu (Thái Hoàng Remix) [Short Version] - Dunghoangpham</p>
                    </div>
                </div>
            </div>

            <div className={cx('footer')}>
                <div className={cx('links-1')}>
                    <a href="#" >About</a>
                    <a href="#" >TikTok Browse</a>
                    <a href="#" >Newsroom</a>
                    <a href="#" >Contact</a>
                    <a href="#" >Careers</a>
                    <a href="#" >ByteDance</a>
                </div>

                <div className={cx('links-2')}>
                    <a href="#" >TikTok for Good</a>
                    <a href="#">Advertise</a>
                    <a href="#" >Developers</a>
                    <a href="#" >Transparency</a>
                    <a href="#" >TikTok Rewards</a>
                </div>

                <div className={cx('links-3')}>
                    <a href="#" >Help</a>
                    <a href="#" >Safety</a>
                    <a href="#" >Terms</a>
                    <a href="#" >Privacy</a>
                    <a href="#" >Creator Portal</a>
                    <a href="#" >Community Guidelines</a>
                </div>

            </div>
</aside>
        </div>
    );
}

export default Sidebar;
