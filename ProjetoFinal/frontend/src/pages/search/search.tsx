import { ChangeEvent, useEffect, useState } from "react"
import Loader from "../../components/loader/loader"
import Navbar from "../../components/navbar/navbar"
import { useSelector } from "react-redux"
import api from "../../api/api"
import { AnimeType } from "../../interfaces/common"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
	faBackward,
	faBorderAll,
	faChevronLeft,
	faChevronRight,
	faListUl,
	faRightToBracket,
	faSearch,
} from "@fortawesome/free-solid-svg-icons"
import { SearchAnimeResponse, UserResponse } from "../../interfaces/responses"
import { AuthState, UserState } from "../../interfaces/user"

import ApiError from "../../components/apiError/apiError.tsx"
import AnimeListGrid from "../../components/animeListGrid/animeListGrid.tsx"

import "./search.css"
import { useNavigate } from "react-router"
import { optionsNames, options, sortOptions } from "./searchFilter.ts"
import ReactPaginate from "react-paginate"
import FormAnime from "../../components/formAnime/formAnime.tsx"
import { Link } from "react-router-dom"
import Message from "../../components/message/message.tsx"
import Modal from "../../components/modal/modal.tsx"
import { MessageProps } from "../../interfaces/components/message.ts"

type ParamsInterface = {
	query: string | null
	sort: string | null
	status: string | null
	format: string | null
	page: string | null
}

type FilterState = {
	sort: string
	status: string
	format: string
}

const Search = () => {
	const navigator = useNavigate()

	// PARAMS
	const urlParams = new URLSearchParams(location.search.split("?")[1])
	const params: ParamsInterface = {
		query: urlParams.get("q"),
		sort: urlParams.get("sort"),
		status: urlParams.get("status"),
		format: urlParams.get("format"),
		page: urlParams.get("page"),
	}
	let page: number = params.page ? parseInt(params.page) : 1

	// FILTERS
	const [queryString, setQueryString] = useState<string>(
		params.query ? params.query : ""
	)
	const initialFilterState: FilterState = {
		sort: params.sort || "",
		status: params.status || "",
		format: params.format || "",
	}
	const [filter, setFilter] = useState<FilterState>(initialFilterState)

	const [listViewStyle, setListViewStyle] = useState<boolean>(false)

	const username = useSelector((state: AuthState) => state.username)
	const [user, setUser] = useState<UserState | null>(null)
	const [isLoading, setIsLoading] = useState(true)

	const [animes, setAnimes] = useState<AnimeType[]>([])
	const [hasErrorAPI, setHasErrorAPI] = useState<boolean>(false)

	const [pages, setPages] = useState(0)

	const [animeSelected, setAnimeSelected] = useState<AnimeType | null>(null)
	const [isFormAnimeOpen, setIsFormAnimeOpen] = useState(false)
	const [isOpenModal, setIsOpenModal] = useState(false)

	const [messageState, setMessageState] = useState<MessageProps>({
		isOpen: false,
		title: "",
		backgroundColor: "",
		children: "",
	})

	useEffect(() => {
		document.title = "Search - AnimeRank"
		setIsLoading(true)

		api
			.get(`/user/getUser/${username}`)
			.then((res: UserResponse) => {
				setUser(res.data)
			})
			.catch((error) => {
				if (error.message === "Network Error") setHasErrorAPI(true)
			})

		// Get animes
		let urlToApi = "/search?"
		if (params.query) urlToApi += `q=${params.query}&`
		if (params.sort) urlToApi += `sort=${params.sort}&`
		if (params.status) urlToApi += `status=${params.status}&`
		if (params.format) urlToApi += `format=${params.format}&`
		if (params.page) urlToApi += `page=${params.page}&`

		setFilter((prevData) => ({
			...prevData,
			sort: params.sort ? params.sort : "",
			format: params.format ? params.format : "",
			status: params.status ? params.status : "",
		}))

		if (urlToApi.split("?")[1]) {
			api.get<SearchAnimeResponse>(urlToApi).then((res) => {
				setAnimes(res.data.data.Page.media)
				setPages(parseInt(res.data.data.Page.pageInfo.lastPage))
			})
		}

		setIsLoading(false)
	}, [
		params.format,
		params.page,
		params.query,
		params.sort,
		params.status,
		username,
	])

	useEffect(() => {}, [animes])

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setQueryString(e.target.value)
	}

	const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
		e?.preventDefault()
		let redirectUrl = "/search?"
		if (queryString) redirectUrl += `q=${queryString}&`
		if (filter?.sort && filter.sort !== sortOptions[0])
			redirectUrl += `sort=${filter?.sort}&`
		if (filter?.status) redirectUrl += `status=${filter?.status}&`
		if (filter?.format) redirectUrl += `format=${filter?.format}&`
		if (page > 1) redirectUrl += `page=${page}&`
		return navigator(redirectUrl)
	}

	const handleFastQuery = (type: string) => {
		let redirectUrl = "/search?"
		switch (type) {
			case "Top Animes":
				redirectUrl += "sort=POPULARITY_DESC&"
				break
			case "Most Scored":
				redirectUrl += "sort=SCORE_DESC&"
				break
			case "Releasing":
				redirectUrl += "status=RELEASING"
				break
		}
		setQueryString("")
		return navigator(redirectUrl)
	}

	const handleFilterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target

		setFilter((prevData) => ({
			...prevData,
			[name]: value,
		}))
	}

	type paginationClickInterface = {
		selected: number
	}

	const handlePageClick = (e: paginationClickInterface) => {
		page = e.selected + 1
		handleSubmit()
	}

	const closeForm = (): void => {
		setAnimeSelected(null)
		setIsFormAnimeOpen(false)
	}

	const closeMessage = (): void => {
		setMessageState({ ...messageState, isOpen: false })
	}

	const handleClickAdd = (anime: AnimeType): void => {
		if (user) {
			setAnimeSelected(anime)
			setIsFormAnimeOpen(true)
		} else {
			setIsOpenModal(true)
		}
	}

	if (animes.length || (!animes.length && !params.page)) {
		return (
			<>
				{user ? <Navbar user={user} /> : <Navbar />}

				<div className="search">
					<div className="header">
						<div className="header_container">
							<h1>
								Search <FontAwesomeIcon icon={faSearch} />
							</h1>
							<form
								action="submit"
								className="form"
								onSubmit={handleSubmit}
							>
								<input
									type="text"
									onChange={handleChange}
									value={queryString}
								/>
								<button type="submit">Submit</button>
							</form>

							<div className="fast_querys">
								<div
									className="query green"
									onClick={() => handleFastQuery("Top Animes")}
								>
									<h3>Top Animes</h3>
								</div>
								<div
									className="query blue"
									onClick={() => handleFastQuery("Most Scored")}
								>
									<h3>Most Scored</h3>
								</div>
								<div
									className="query yellow"
									onClick={() => handleFastQuery("Releasing")}
								>
									<h3>Releasing</h3>
								</div>
							</div>

							<div className="filters">
								{optionsNames.map((optionName, i) => (
									<div
										className="filter"
										key={i}
									>
										<div className="label">
											<h3>{optionName}</h3>
										</div>
										<select
											name={optionName.toLowerCase()}
											onChange={handleFilterChange}
											value={
												filter[optionName.toLowerCase() as keyof FilterState]
											}
										>
											{options[i].map((option, j) => (
												<option
													key={j + i}
													value={option}
													defaultValue={j === 0 ? option : undefined}
												>
													{option ? option.split("_").join(" ") : "-----"}
												</option>
											))}
										</select>
									</div>
								))}
							</div>
							<div className="icons">
								<FontAwesomeIcon
									icon={faBorderAll}
									size="2x"
									className={`grid ${listViewStyle ? "" : "active"}`}
									onClick={() => setListViewStyle(!listViewStyle)}
								/>
								<FontAwesomeIcon
									icon={faListUl}
									size="2x"
									className={`list ${listViewStyle ? "active" : ""}`}
									onClick={() => setListViewStyle(!listViewStyle)}
								/>
							</div>
						</div>
					</div>

					<AnimeListGrid
						animes={animes}
						listViewStyle={listViewStyle}
						userAnimes={user?.animes || null}
						userProfileAnimes={null}
						handleClickAdd={handleClickAdd}
						toSearch={true}
					/>

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

					<Message
						closeMessage={closeMessage}
						isOpen={messageState.isOpen}
						title={messageState.title}
						backgroundColor={messageState.backgroundColor}
					>
						{messageState.children}
					</Message>

					{animes.length ? (
						<div className="pages">
							<ReactPaginate
								breakLabel="..."
								nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
								onPageChange={handlePageClick}
								pageRangeDisplayed={3}
								pageCount={pages}
								previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
							/>
						</div>
					) : (
						""
					)}
				</div>

				<Loader isActive={isLoading} />
			</>
		)
	} else if (!animes.length && params.page) {
		return (
			<>
				{user ? <Navbar user={user} /> : <Navbar />}
				<div className="search">
					<div className="header">
						<div className="header_container">
							<h1>
								Search <FontAwesomeIcon icon={faSearch} />
							</h1>
							<form
								action="submit"
								className="form"
								onSubmit={handleSubmit}
							>
								<input
									type="text"
									onChange={handleChange}
									value={queryString}
								/>
								<button type="submit">Submit</button>
							</form>

							<div className="fast_querys">
								<div
									className="query green"
									onClick={() => handleFastQuery("Top Animes")}
								>
									<h3>Top Animes</h3>
								</div>
								<div
									className="query blue"
									onClick={() => handleFastQuery("Most Scored")}
								>
									<h3>Most Scored</h3>
								</div>
								<div
									className="query yellow"
									onClick={() => handleFastQuery("Releasing")}
								>
									<h3>Releasing</h3>
								</div>
							</div>

							<div className="filters">
								{optionsNames.map((optionName, i) => (
									<div
										className="filter"
										key={i}
									>
										<div className="label">
											<h3>{optionName}</h3>
										</div>
										<select
											name={optionName.toLowerCase()}
											onChange={handleFilterChange}
											value={
												filter[optionName.toLowerCase() as keyof FilterState]
											}
										>
											{options[i].map((option, j) => (
												<option
													key={j + i}
													value={option}
													defaultValue={j === 0 ? option : undefined}
												>
													{option ? option.split("_").join(" ") : "-----"}
												</option>
											))}
										</select>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="page_error">
						<h1>Página de busca inválida...</h1>
						<h1>Desculpa pelo transtorno!</h1>
						<h1>
							A API infelizmente retorna valores incorretos quanto às páginas...
						</h1>

						<button>
							<h4
								onClick={() => {
									page = 1
									handleSubmit()
								}}
							>
								Voltar para página 1
								<FontAwesomeIcon icon={faBackward} />
							</h4>
						</button>
					</div>
				</div>
			</>
		)
	} else if (hasErrorAPI) {
		return <ApiError />
	}
}

export default Search
