export class Profile {
  username: string;
  bio: string;
  image: string;
  // following key/value is created by a mongoose method on User model when profile is retrieved
  following: boolean;
}
