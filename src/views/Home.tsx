import { Image } from "../components/common/Image";
import { Paragraph } from "../components/common/Paragraph";
import { Section } from "../components/common/Section";
import { ContentWrapper } from "../components/layout/ContentWrapper";
import { Main } from "../components/layout/Main";

import icon from '../assets/icon.ico';
import { Link } from "react-router-dom";

export const Home = () => {
    return (
        <ContentWrapper>
            <Main className="home">
                <Section title="StreamCat">
                    <Paragraph>
                        StreamCat is a streaming-based website that imitates famous platforms like: YouTube, Twitch, Watch2Gether, etc. The main advantage of this platform is the small number of users, thanks to which server delays are minimal and the data flow is express.
                    </Paragraph>
                    <Image alt="StreamCat icon" src={icon} isStatic className="home__image" />
                    <Paragraph>
                        When boredom catches up with you and your buddies, play funny videos and cute cats on a shared screen! Do not hesitate and <Link to="/room" className="link strong">create</Link> your own room. Invite your friends and watch without hesitation!
                    </Paragraph>
                </Section>
                <Section title="Plans for future">
                    <Paragraph indent={false}>
                        {`- Watch2Gether clone
- Youtube clone
- Twitch clone
- Music app with live streaming`}
                    </Paragraph>
                </Section>
            </Main>
        </ContentWrapper>
    );
};