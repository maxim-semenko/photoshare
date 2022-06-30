import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import PostComponent from "./PostComponent";
import InfiniteScroll from "react-infinite-scroll-component";
import {CircularProgress} from "@mui/material";

export default function VirtualizedListOneItemComponent(props) {
    return (
        <div>
            <InfiniteScroll
                dataLength={props.list.length}
                next={props.scrollEvent}
                hasMore={props.hasNext}
                loader={<h4 style={{paddingLeft: "29%"}}><CircularProgress/></h4>}
            >
                {
                    props.list.map(item => (
                        <ListItem component="div">
                            <div style={{width: "70%", paddingBottom: "1%"}}>
                                <PostComponent object={item} height={500}/>
                            </div>
                        </ListItem>
                    ))
                }
            </InfiniteScroll>
        </div>
    );
}