import Thread from "./Thread";
import styles from "../../styles/components/ThreadList.module.css";

const ThreadList = (props) => {
  const threadList = props.source.map((thread) => {
    return <Thread key={thread.id} thread={thread} />;
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.nameHeader}>{props.name}</h3>
      {threadList}
    </div>
  );
};

export default ThreadList;
