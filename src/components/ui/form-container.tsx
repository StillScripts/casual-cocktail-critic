import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface FormContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const FormContainer = ({
  title,
  description,
  children,
}: FormContainerProps) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      {description && <CardDescription>{description}</CardDescription>}
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);
