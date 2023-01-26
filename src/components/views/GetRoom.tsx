import { Section } from "../common/Section";
import { Title } from "../common/Title";
import { ContentWrapper } from "../layout/ContentWrapper";
import { Main } from "../layout/Main";

export const GetRoom = () => {
    return (
        <ContentWrapper>
            <Main className="get-room">
                <Section>
                    <Title>Get Room</Title>
                </Section>
            </Main>
        </ContentWrapper>
    );
};