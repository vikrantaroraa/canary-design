export interface CarouselTypeBProps {
  images: string[];
  rotate?: boolean;
  UserIndicatorComponent?: React.FC<UserIndicatorComponentProps>;
  UserNavigationButtons?: React.FC<UserNavigationButtonsProps>;
  children: JSX.Element[];
}

interface UserIndicatorComponentProps {
  index: number;
  activeIndex: number;
  changeImage: (index: number) => void;
}

interface UserNavigationButtonsProps {
  slideLeft: () => void;
  slideRight: () => void;
  showDarkIcons: boolean;
}
