import styled from "styled-components";
import { breakpoint, space } from "@styles/theme";
import { ProjectCard } from "../project-card";
import { useProjects } from "../../api/use-projects";
import { Spinner, SpinnerColor, SpinnerSize } from "@features/ui/spinner";
import { Error } from "@features/ui/error/error";

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: ${space(6)};

  // reset list styles
  list-style: none;
  padding: 0;
  margin: 0;

  @media (min-width: ${breakpoint("desktop")}) {
    grid-template-columns: repeat(auto-fit, 400px);
  }
`;

export function ProjectList() {
  const { data, isLoading, isError, error } = useProjects();

  if (isLoading) {
    return <Spinner size={SpinnerSize.lg} color={SpinnerColor.primary} />;
  }

  if (isError) {
    console.error(error);

    return <Error />;
  }

  return (
    <List>
      {data?.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} />
        </li>
      ))}
    </List>
  );
}
