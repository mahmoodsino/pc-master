import React from "react";

interface Props {
  className: string;
}

const LinkedInIcon = ({ className }: Props) => {
  return (
    <svg
      className={className}
      viewBox="0 0 29 29"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M9.58594 12.1875V21.4375C9.58594 21.6675 9.49457 21.8881 9.33194 22.0507C9.16931 22.2133 8.94874 22.3047 8.71875 22.3047C8.48876 22.3047 8.26819 22.2133 8.10556 22.0507C7.94293 21.8881 7.85156 21.6675 7.85156 21.4375V12.1875C7.85156 11.9575 7.94293 11.7369 8.10556 11.5743C8.26819 11.4117 8.48876 11.3203 8.71875 11.3203C8.94874 11.3203 9.16931 11.4117 9.33194 11.5743C9.49457 11.7369 9.58594 11.9575 9.58594 12.1875ZM8.71875 6.11719C8.43289 6.11719 8.15346 6.20195 7.91578 6.36077C7.6781 6.51958 7.49285 6.74531 7.38346 7.0094C7.27406 7.2735 7.24544 7.5641 7.30121 7.84447C7.35698 8.12483 7.49463 8.38236 7.69676 8.58449C7.89889 8.78662 8.15642 8.92427 8.43678 8.98004C8.71715 9.03581 9.00775 9.00719 9.27185 8.89779C9.53594 8.7884 9.76167 8.60315 9.92048 8.36547C10.0793 8.12779 10.1641 7.84836 10.1641 7.5625C10.1641 7.17918 10.0118 6.81156 9.74074 6.54051C9.46969 6.26946 9.10207 6.11719 8.71875 6.11719ZM28.6641 2.35938V26.6406C28.6641 27.1773 28.4509 27.6919 28.0714 28.0714C27.6919 28.4509 27.1773 28.6641 26.6406 28.6641H2.35938C1.82273 28.6641 1.30806 28.4509 0.928589 28.0714C0.549121 27.6919 0.335938 27.1773 0.335938 26.6406V2.35938C0.335938 1.82273 0.549121 1.30806 0.928589 0.928589C1.30806 0.549121 1.82273 0.335938 2.35938 0.335938H26.6406C27.1773 0.335938 27.6919 0.549121 28.0714 0.928589C28.4509 1.30806 28.6641 1.82273 28.6641 2.35938ZM26.9297 2.35938C26.9297 2.28271 26.8992 2.20919 26.845 2.15498C26.7908 2.10077 26.7173 2.07031 26.6406 2.07031H2.35938C2.28271 2.07031 2.20919 2.10077 2.15498 2.15498C2.10077 2.20919 2.07031 2.28271 2.07031 2.35938V26.6406C2.07031 26.7173 2.10077 26.7908 2.15498 26.845C2.20919 26.8992 2.28271 26.9297 2.35938 26.9297H26.6406C26.7173 26.9297 26.7908 26.8992 26.845 26.845C26.8992 26.7908 26.9297 26.7173 26.9297 26.6406V2.35938ZM17.3906 11.3203C16.2255 11.3212 15.0985 11.7362 14.2109 12.491V12.1875C14.2109 11.9575 14.1196 11.7369 13.9569 11.5743C13.7943 11.4117 13.5737 11.3203 13.3438 11.3203C13.1138 11.3203 12.8932 11.4117 12.7306 11.5743C12.5679 11.7369 12.4766 11.9575 12.4766 12.1875V21.4375C12.4766 21.6675 12.5679 21.8881 12.7306 22.0507C12.8932 22.2133 13.1138 22.3047 13.3438 22.3047C13.5737 22.3047 13.7943 22.2133 13.9569 22.0507C14.1196 21.8881 14.2109 21.6675 14.2109 21.4375V16.2344C14.2109 15.3911 14.5459 14.5823 15.1422 13.986C15.7386 13.3897 16.5473 13.0547 17.3906 13.0547C18.2339 13.0547 19.0427 13.3897 19.639 13.986C20.2353 14.5823 20.5703 15.3911 20.5703 16.2344V21.4375C20.5703 21.6675 20.6617 21.8881 20.8243 22.0507C20.9869 22.2133 21.2075 22.3047 21.4375 22.3047C21.6675 22.3047 21.8881 22.2133 22.0507 22.0507C22.2133 21.8881 22.3047 21.6675 22.3047 21.4375V16.2344C22.3009 14.9323 21.7819 13.6846 20.8612 12.7638C19.9404 11.8431 18.6927 11.3241 17.3906 11.3203Z" />
    </svg>
  );
};

export default LinkedInIcon;
