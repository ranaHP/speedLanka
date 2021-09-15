import React,{useEffect,useState} from "react";
import {Col, Row} from "react-bootstrap";
import {XCircle} from "react-feather";
import {useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducers";
import {IAlertSystem} from "../../store/Interfaces/inteface";

const AlertSystem: React.FC = () => {
    const [isShow, setIsShow] = useState<boolean>(true);
    const alertDetails: IAlertSystem[] = useSelector((state: RootState) => state.alertItemReducer.alertItem);

    useEffect(() => {

        setIsShow(alertDetails[0] ? alertDetails[0].isShow: false);
        setTimeout( () => {
            setIsShow(false);
        },5000)

    }, [alertDetails]);

    return (
        <div className={`alert-system alert alert ${alertDetails[0] && alertDetails[0].type  }`}  style={{
            display: isShow ? "block":"none"
        }} >
            <Row className="close-btn-container m-0 p-0 pb-1" >
                { alertDetails[0] && alertDetails[0].title}
                <div className="close-btn" onClick={ () => {
                    setIsShow(false)
                }}>
                    <XCircle></XCircle>
                </div>
            </Row>
            <Row className="m-0 p-0">
                <Col className="m-0 p-0 mb-1">
                    {
                        alertDetails[0] &&
                        <>

                            <span>  {alertDetails[0].message}</span>
                        </>
                    }
                </Col>
            </Row>
        </div>
    )
}

export default AlertSystem;