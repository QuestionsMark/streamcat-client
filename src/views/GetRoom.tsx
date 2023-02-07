import { useNavigate } from "react-router-dom";
import { usePromises } from "../contexts/promises.context";
import { fetchTool, minimalDelayFunction } from "../utils/api.util";
import { Button } from "../components/common/Button";
import { Section } from "../components/common/Section";
import { Title } from "../components/common/Title";
import { ContentWrapper } from "../components/layout/ContentWrapper";
import { Main } from "../components/layout/Main";

export const GetRoom = () => {
    const { setLoading, setError } = usePromises();

    const navigate = useNavigate();

    const handleClick = async () => {
        setLoading(true);
        const { delayTime, response } = await minimalDelayFunction(() => fetchTool('room', 'POST'));
        setTimeout(() => {
            setLoading(false);
            if (!response.status) return setError(response.message);
            navigate(`/room/${response.results}`);
        }, delayTime);
    };

    return (
        <ContentWrapper>
            <Main className="get-room">
                <Section>
                    <Title className="get-room__title">Get Your Room</Title>
                    <Button onClick={handleClick} className="get-room__btn" type="button">
                        Create Room!
                    </Button>
                </Section>
            </Main>
        </ContentWrapper>
    );
};