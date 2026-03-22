export class User {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly document: string,
    public readonly email: string,
    public readonly password: string,
    public readonly isPremium: boolean,
  ) {}
}
