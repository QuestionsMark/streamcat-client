import { useNavigate } from "react-router-dom";
import { fetchTool } from "../../utils/api.util";
import { Button } from "../common/Button";
import { Section } from "../common/Section";
import { Title } from "../common/Title";
import { ContentWrapper } from "../layout/ContentWrapper";
import { Main } from "../layout/Main";

export const GetRoom = () => {
    const navigate = useNavigate();

    const handleClick = async () => {
        const response = await fetchTool<string>('room', 'POST');
        if (!response.status) return console.log(response.message);
        navigate(`/room/${response.results}`);
    };

    return (
        <ContentWrapper>
            <Main className="get-room">
                <Section>
                    <Title>Get Room</Title>
                    <Button onClick={handleClick}>
                        Create Room!
                    </Button>
                </Section>
            </Main>
        </ContentWrapper>
    );
};