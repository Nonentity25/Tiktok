import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
import { useState } from 'react';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, onMouseenter, data, onMouseleave }) {


    const [allAccount, setAllAccount] = useState(data)
    const [renderAccount, setRenderAccount] = useState(allAccount.slice(0, 5))
    const [seeMore, setSeeMore] = useState(true)


    const handleShowMore = () => {


        if (seeMore) {
            setRenderAccount(allAccount)

        } else if (!seeMore) {
            setRenderAccount(allAccount.slice(0, 5))
        }
        setSeeMore(!seeMore)
    }

    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {
                renderAccount.map((account) => (

                    <AccountItem onMouseleave={onMouseleave} onMouseenter={onMouseenter} data={account} key={account.id} />

                ))
            }
            <p className={cx('more-btn')} onClick={handleShowMore}>
                {seeMore ? 'See all' : 'See less'}
            </p>
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
