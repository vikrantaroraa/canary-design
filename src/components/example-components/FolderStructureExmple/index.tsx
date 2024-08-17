import Folder, { FolderStructureProps } from "src/components/FolderStructure";

const folders: FolderStructureProps[] = [
  {
    name: "Home",
    folders: [
      {
        name: "Movies",
        folders: [
          {
            name: "Action",
            folders: [
              {
                name: "2000s",
                folders: [
                  { name: "Gladiator.mp4" },
                  { name: "American-Beauty.mp4" },
                ],
              },
              { name: "2010s", folders: [] },
            ],
          },
          { name: "Comedy", folders: [{ name: "2000s", folders: [] }] },
        ],
      },
      {
        name: "Music",
        folders: [
          { name: "Rock", folders: [] },
          { name: "Classical", folders: [] },
        ],
      },
      { name: "Pictures", folders: [] },
      { name: "Documents", folders: [] },
      { name: "passwords.txt" },
    ],
  },
];

const ExampleFolderStructure = () => {
  return (
    <>
      <ul>
        {folders.map((folder, index) => (
          <Folder folder={folder} key={index} />
        ))}
      </ul>
    </>
  );
};

export default ExampleFolderStructure;
