import {ALERT_SYSTEM_SHOW} from "../constants/CheckoutConstants";
import {alertSystem, IAlertSystem} from "../Interfaces/inteface";

export const alertSystemAction = (alert: IAlertSystem): alertSystem => {
    return {
        type: ALERT_SYSTEM_SHOW,
        payload: alert
    }
}


