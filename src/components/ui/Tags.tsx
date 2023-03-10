import { useNavigate } from "react-router-dom";
import { CollectionInfo } from "../../../typings";

interface Props {
  tags: CollectionInfo["tags"] | undefined;
}

function Tags({ tags }: Props) {
  const navigate = useNavigate();

  return (
    <div className="mt-2 flex flex-wrap items-center justify-center">
      {tags?.map((tag) => {
        return (
          <button
            onClick={() => navigate(`/search/${tag.title}`)}
            className="m-1 rounded-lg border border-black px-3 hover:bg-gray-300 dark:border-white dark:hover:bg-gray-900"
            key={tag.title}>
            {tag.title}
          </button>
        );
      })}
    </div>
  );
}

export default Tags;
