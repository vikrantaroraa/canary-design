export interface CarouselTypeAProps {
  images: string[];
  rotate?: boolean;
  UserIndicatorComponent?: React.FC<UserIndicatorComponentProps>;
  UserNavigationButtons?: React.FC<UserNavigationButtonsProps>;
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
