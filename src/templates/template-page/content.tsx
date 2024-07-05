import { ContentSkeleton } from "../../components/UI/skeletons.tsx/content-skeleton";

type ContentProps = {
  isPending: boolean;
  children: React.ReactNode;
};

export const Content = ({ children, isPending }: ContentProps) => {
  if (isPending) return <ContentSkeleton />;

  return (
    <div className="my-6 grid grid-cols-3 place-items-center gap-6 max-md:grid-cols-2 max-[420px]:grid-cols-1">
      {children}
    </div>
  );
};
