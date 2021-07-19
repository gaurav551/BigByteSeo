import { Spin } from 'antd';
import 'antd/dist/antd.css'
import React from 'react'
import ReactDOM from 'react-dom';
import styles from './Loading.module.css'

const Loading = ({ name }) => {
    const portalElement = document.getElementById('loadingSpinner');
   
   let content = <div className={styles.backdrop}>
                    <div className={styles.example}>
                        <Spin size="large" tip={name} />
                    </div>
                 </div>

    return (
        <React.Fragment>
            {ReactDOM.createPortal(content, portalElement)}
        </React.Fragment>


    )
}
Loading.defaultProps = {
    name: 'Loading..',

};
export default Loading;
