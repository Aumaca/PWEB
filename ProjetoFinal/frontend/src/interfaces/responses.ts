import { ProfileState, UserState } from "./user"
import { PageData, AnimeType } from "./common"

export interface LoginResponse {
	token: string
	username: string
}

export interface ProfileResponse {
	data: ProfileState
}

export interface ProfilesResponse {
	data: ProfileState[]
}

export interface UserResponse {
	data: UserState
}

export interface HomePageResponse {
	data: {
		popularAnimes: PageData
		mostScoredAnimes: PageData
		releasingAnimes: PageData
	}
}

export interface AnimeNewsResponse {
	value: AnimeNew[]
}

export interface AnimeNew {
	name: string
	url: string
	image: AnimeNewImage
}

interface AnimeNewImage {
	contentUrl: string
}

export interface AnimeResponse {
	data: {
		Media: AnimeType
	}
}

export interface UserAndListResponse {
	user: ProfileState
	animes: AnimeType[]
}

export interface SearchAnimeResponse {
	data: {
		Page: {
			pageInfo: PageInfo
			media: AnimeType[]
		}
	}
}

export interface PageInfo {
	lastPage: string
}