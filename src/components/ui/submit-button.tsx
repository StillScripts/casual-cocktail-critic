import { Button } from "./button";
import { LoadingSpinner } from "./icons";

export const SubmitButton = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Button type="submit" disabled={loading}>
      {loading ? (
        <div className="flex items-end">
          <span className="mr-2">Saving...</span>
          <LoadingSpinner />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};
