import Thread from "./Thread";
import styles from "../../styles/components/ThreadList.module.css";
import { Link } from "react-router-dom";

const ThreadList = (props) => {
  const threadList = props.source?.map((thread) => {
    return <Thread key={thread.id} thread={thread} category={props.category} />;
  });

  return (
    <div className={styles.container}>
      
      <h3 className={styles.nameHeader}>{props.category.name}</h3>
      {props.category.id !== undefined ? 
      <div className={styles.addThread}>
        <Link to={"/category/" + props.category.id + "/addThread/"+props.category.id}>Add Thread</Link>
      </div> : ''
      }
      
      {threadList}
    </div>
  );
};

export default ThreadList;
