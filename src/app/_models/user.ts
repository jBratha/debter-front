export class User {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  authorities: Authority[];
  enabled: boolean;
  token?: string;
}

class Authority {
  authority: String;
}
