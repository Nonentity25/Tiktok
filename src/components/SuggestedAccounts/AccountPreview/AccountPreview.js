import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import styles from './AccountPreview.module.scss';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function AccountPreview({ data, style, onMouseleave = () => { }, onMouseenter = () => { } }) {

    return (
        <div className={cx('container')} style={{ top: style }} onMouseLeave={onMouseleave} onMouseEnter={onMouseenter} >
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <img
                        className={cx('avatar')}
                        src={data.avatar} alt={data.nickName}
                    />
                    <Button className={cx('follow-btn')} primary>
                        Follow
                    </Button>
                </div>
                <div className={cx('body')}>
                    <p className={cx('nickname')}>
                        <strong>{data.nickName}</strong>
                        <FontAwesomeIcon icon={faCheckCircle} className={cx('check')} />
                    </p>
                    <p className={cx('name')}>{data.name}</p>
                    <p className={cx('analytics')}>
                        <strong className={cx('value')}>{data.folowers} </strong>
                        <span className={cx('label')}>Followers</span>

                        <strong className={cx('value')}>{data.likes} </strong>
                        <span className={cx('label')}>Likes</span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AccountPreview;
