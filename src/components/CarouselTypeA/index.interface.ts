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
  // since the user does not have any control over passing this prop by himself i.e. this prop is being passed from
  // inside the CarouselTypeA component, so user can not set this from outside when passing props to the CarouselTypeA
  // component, so we are commenting it for now. (Note:- The same comment is also present in the index.interface.ts
  // file of CarouselTypeB component. If you make any changes, then make at both places)
  // showDarkIcons: boolean;
}
