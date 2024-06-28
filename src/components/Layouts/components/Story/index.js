import { fas } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from '~/api/axios';

const Story = ({ children }) => {
    //
    useEffect(() => {
        //
        // console.log('Story...');
        // console.log(story);
        // //
        // console.log(listStory);
    }, []);

    return (
        <>
            <li id={children.id} className="story ">
                <button className="btnPlayStory">
                    <video className="storyContent " src={children.videos[0].videoUrl} loop playsInline></video>;
                </button>
                <div className="storyInfo">
                    <img src={children.user.avatar} alt=""></img>
                    <span className="storyInfoUserName">{children.user.name}</span>
                </div>
            </li>
        </>
    );
};

export default Story;
