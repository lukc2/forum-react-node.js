import React from "react";
import styles from "../../styles/components/UserStats.module.css";
const UserStats = (props) => {
  //console.log(props.user)
  var rank = props.ranks.find(item => item.id === props.user.rank_id)
  return <div className={styles.container}>
    <div className={styles.avatarContainer}>
      <img className={styles.avatar} alt='' src={props.user.avatar}></img>
    </div>
    <div className={styles.infoCenter}>{props.user.nickname}</div>
    <div className={styles.infoSide}>Rank:</div> 
    <div className={styles.infoCenter}>{rank?.name}</div>
  </div>;
};
export default UserStats;
