import React from "react";
import styles from "../../styles/components/UserStats.module.css";
const UserStats = (props) => {
  //console.log(props.user)
  return <div className={styles.container}>
    <div className={styles.avatarContainer}>
      <img className={styles.avatar} alt='' src={'data:image/png;base64,'+ props.user[0].avatar}></img>
    </div>
    <div className={styles.infoCenter}>{props.user[0].nickname}</div>
    <div className={styles.infoSide}>Rank:</div> 
    <div className={styles.infoCenter}>{props.user[1]}</div>
  </div>;
};
export default UserStats;
