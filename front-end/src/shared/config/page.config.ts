class PageConfig {
  private readonly AUTH = '/auth'

  readonly HOME = '/'

  readonly LOGIN = this.AUTH + '/login'
  readonly REGISTER = this.AUTH + '/register'
}

export const PAGES = new PageConfig()
