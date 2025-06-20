/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { Swiper, SwiperSlide } from "swiper/react"
import { EffectCoverflow, Pagination } from "swiper/modules"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faFire,
	faStar,
	faRss,
	faRightToBracket,
} from "@fortawesome/free-solid-svg-icons"

import api from "../../api/api"
import Navbar from "../../components/navbar/navbar"
import Loader from "../../components/loader/loader"
import Message from "../../components/message/message"
import FormAnime from "../../components/formAnime/formAnime"

import { AuthState, UserState } from "../../interfaces/user"
import { AnimeType } from "../../interfaces/common"
import {
	HomePageResponse,
	AnimeNewsResponse,
	AnimeNew,
} from "../../interfaces/responses"
import { MessageProps } from "../../interfaces/components/message"
import ApiError from "../../components/apiError/apiError.tsx"

import "./home.css"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/effect-coverflow"
import HomeSlider from "./homeSlider.tsx"
import Modal from "../../components/modal/modal.tsx"
import { Link } from "react-router-dom"
import axios from "axios"

const Homepage = () => {
	document.title = "Homepage - AnimeRank"

	const username = useSelector((state: AuthState) => state.username)
	const [user, setUser] = useState<UserState | null>(null)

	const [hasErrorAPI, setHasErrorAPI] = useState<boolean>(false)
	const [popularAnimes, setPopularAnimes] = useState<AnimeType[] | null>(null)
	const [mostScoredAnimes, setMostScoredAnimes] = useState<AnimeType[] | null>(
		null
	)
	const [releasingAnimes, setReleasingAnimes] = useState<AnimeType[] | null>(
		null
	)
	const [animeSelected, setAnimeSelected] = useState<AnimeType | null>(null)
	const [animeNews, setAnimeNews] = useState<AnimeNew[] | null>(null)

	const [isLoading, setIsLoading] = useState(true)
	const [isFormAnimeOpen, setIsFormAnimeOpen] = useState(false)
	const [isOpenModal, setIsOpenModal] = useState(false)

	const [messageState, setMessageState] = useState<MessageProps>({
		isOpen: false,
		title: "",
		backgroundColor: "",
		children: "",
	})

	useEffect(() => {
		// User
		api.get<UserState>(`/user/getUser/${username}`).then((response) => {
			setUser(response.data)
		})

		// Animes
		const fetchAnimes = () => {
			api
				.get<HomePageResponse>("/home/animes")
				.then((response) => {
					const data = response.data.data
					setPopularAnimes(data.popularAnimes.media)
					setMostScoredAnimes(data.mostScoredAnimes.media)
					setReleasingAnimes(data.releasingAnimes.media)

					localStorage.setItem("animes", JSON.stringify(data))

					const expiryDate = new Date()
					expiryDate.setHours(expiryDate.getHours() + 24)
					localStorage.setItem("animesExpiryDate", expiryDate.toISOString())
				})
				.catch(() => {
					setHasErrorAPI(true)
				})
		}
		const localAnimes = localStorage.getItem("animes")
		const localAnimesExpiryDate = localStorage.getItem("animesExpiryDate")

		if (localAnimes && localAnimesExpiryDate) {
			const expiryDate = new Date(localAnimesExpiryDate)
			const currentDate = new Date()

			if (currentDate < expiryDate) {
				const animes = JSON.parse(localAnimes)
				setPopularAnimes(animes.popularAnimes.media)
				setMostScoredAnimes(animes.mostScoredAnimes.media)
				setReleasingAnimes(animes.releasingAnimes.media)
			} else {
				fetchAnimes()
			}
		} else {
			fetchAnimes()
		}

		// Animes News
		const fetchAnimeNews = () => {
			const config = {
				headers: {
					"Ocp-Apim-Subscription-Key": import.meta.env.VITE_NEWS_API_KEY,
				},
			}

			axios
				.get<AnimeNewsResponse>(
					"https://api.bing.microsoft.com/v7.0/news/search?q=anime&cc=US&sortBy=Date&originalImg=true&count=15&mkt=en-us",
					config
				)
				.then((response) => {
					const data = response.data.value
					setAnimeNews(data)
					localStorage.setItem("news", JSON.stringify(data))

					const expiryDate = new Date()
					expiryDate.setHours(expiryDate.getHours() + 24)
					localStorage.setItem("newsExpiryDate", expiryDate.toISOString())
				})
		}

		const localNews = localStorage.getItem("news")
		const localNewsExpiryDate = localStorage.getItem("newsExpiryDate")

		if (localNews && localNewsExpiryDate) {
			const expiryDate = new Date(localNewsExpiryDate)
			const currentDate = new Date()

			if (currentDate < expiryDate) {
				setAnimeNews(JSON.parse(localNews))
			} else {
				fetchAnimeNews()
			}
		} else {
			fetchAnimeNews()
		}

		setIsLoading(false)
	}, [username])

	const handleClickAdd = (anime: AnimeType): void => {
		if (user) {
			setAnimeSelected(anime)
			setIsFormAnimeOpen(true)
		} else {
			setIsOpenModal(true)
		}
	}

	const closeForm = (): void => {
		setAnimeSelected(null)
		setIsFormAnimeOpen(false)
	}

	const closeMessage = (): void => {
		setMessageState({ ...messageState, isOpen: false })
	}

	if (popularAnimes && mostScoredAnimes && releasingAnimes) {
		return (
			<>
				{user ? (
					<Navbar
						user={user}
						isForHome={true}
					/>
				) : (
					<Navbar isForHome={true} />
				)}

				<div className="homepage">
					{animeNews && (
						<div className="news">
							<Swiper
								modules={[Pagination, EffectCoverflow]}
								pagination={{ clickable: true }}
								loop={true}
								slidesPerView={1}
								centeredSlides={true}
								effect="coverflow"
								breakpoints={{
									768: {
										slidesPerView: 2,
									},
								}}
							>
								{animeNews.map(
									(animeNew) =>
										animeNew.image && (
											<SwiperSlide
												className="new"
												key={animeNew.name}
											>
												<Link
													to={animeNew.url}
													target="_blank"
												>
													<img
														src={animeNew.image.contentUrl}
														alt=""
													/>
													<div className="content">
														<h1>{animeNew.name}</h1>
													</div>
												</Link>
											</SwiperSlide>
										)
								)}
							</Swiper>
						</div>
					)}

					<div className="container">
						<h1 className="popular">
							Most Popular <FontAwesomeIcon icon={faFire} />
						</h1>
						<HomeSlider
							user={user}
							animesArray={popularAnimes}
							handleClickAdd={handleClickAdd}
						/>
					</div>

					<div className="container">
						<h1 className="scored">
							Most Scored <FontAwesomeIcon icon={faStar} />
						</h1>
						<HomeSlider
							user={user}
							animesArray={mostScoredAnimes}
							handleClickAdd={handleClickAdd}
						/>
					</div>

					<div className="container">
						<h1 className="releasing">
							Releasing Animes <FontAwesomeIcon icon={faRss} />
						</h1>
						<HomeSlider
							user={user}
							animesArray={releasingAnimes}
							handleClickAdd={handleClickAdd}
						/>
					</div>

					<Modal
						isOpen={isOpenModal}
						setIsOpen={setIsOpenModal}
						backgroundColor="blue"
					>
						<FontAwesomeIcon
							icon={faRightToBracket}
							size="4x"
						/>
						<p>You need to be logged to add animes to your list.</p>
						<Link
							to="/login"
							className="modal_link"
						>
							<button>Go to login page</button>
						</Link>
					</Modal>

					{user && (
						<FormAnime
							anime={animeSelected}
							isOpen={isFormAnimeOpen}
							user={user}
							toSetUser={setUser}
							closeForm={closeForm}
							setIsLoading={setIsLoading}
							setMessageState={setMessageState}
						/>
					)}

					<Message
						closeMessage={closeMessage}
						isOpen={messageState.isOpen}
						title={messageState.title}
						backgroundColor={messageState.backgroundColor}
					>
						{messageState.children}
					</Message>
				</div>
			</>
		)
	} else if (hasErrorAPI) {
		return <ApiError />
	} else {
		return (
			<>
				<Navbar />
				<Loader isActive={isLoading} />
			</>
		)
	}
}

export default Homepage
