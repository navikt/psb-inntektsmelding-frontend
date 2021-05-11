import React from 'react';
import styles from './listItem.less';

interface ListItemProps {
    firstColumnRenderer: () => React.ReactNode;
    secondColumnRenderer: () => React.ReactNode;
}

const ListItem = ({ firstColumnRenderer, secondColumnRenderer }: ListItemProps) => {
    return (
        <div className={styles.listItem}>
            <div className={styles.listItem__firstColumn}>{firstColumnRenderer()}</div>
            <div className={styles.listItem__secondColumn}>{secondColumnRenderer()}</div>
        </div>
    );
};

export default ListItem;
