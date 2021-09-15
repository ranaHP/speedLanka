import React, {useEffect,useState} from "react";
// import {Star} from "react-feather";
import {Star, StarBorder} from '@material-ui/icons';
import {IFormData} from "../../types/MainTypes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/reducers/rootReducers";
import {addFavPostItem, deletePostItem} from "../../store/actions/CheckoutActions";

type FavoritProps = {
    postData: IFormData
    componentType: string
}
const Favorit: React.FC<FavoritProps> = (props) => {
    const [isFav, setIsFav] = useState<boolean>(false);
    const favPostList: IFormData [] = useSelector((state: RootState) => state.favPostListReducer.favPostList);
    const dispatch = useDispatch();

    useEffect(() => {
        let index:number = favPostList.findIndex((post:IFormData) => post._id == props.postData._id);
        if(index == -1){
            setIsFav(false);
            return;
        }
        setIsFav(true);
    }, [favPostList]);

    return (
    <div className="add-to-fav">
        {
            props.componentType === "2" &&
            <div  onClick={() => {
                if(isFav){
                    dispatch(deletePostItem(
                        props.postData._id
                    ))
                }else {
                    if(props.postData){
                        dispatch(addFavPostItem(
                            props.postData
                        ))
                    }
                }

            }}>
                Add to Favorite
                {!isFav ? <StarBorder/> : <Star/>}
            </div>
        }

        {
            props.componentType !== "2" &&
            <div className="add-to-fav" onClick={() => {

            }}>
                Add to Favorite
                {!isFav ? <StarBorder/> : <Star/>}
            </div>
        }
    </div>


    );
}

export default Favorit;