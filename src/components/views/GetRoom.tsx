import { useNavigate } from "react-router-dom";
import { usePromises } from "../../contexts/promises.context";
import { fetchTool, minimalDelayFunction } from "../../utils/api.util";
import { Button } from "../common/Button";
import { Section } from "../common/Section";
import { Title } from "../common/Title";
import { ContentWrapper } from "../layout/ContentWrapper";
import { Main } from "../layout/Main";

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