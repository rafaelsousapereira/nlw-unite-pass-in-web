import {
  Search,
  MoreHorizontal,
  ChevronsLeft,
  ChevronLeft,
  ChevronsRight,
  ChevronRight,
} from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime)
dayjs.locale("pt-br")

interface Attendee {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

export const AttendeeList = () => {
  
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? ''
    }

    return ''
  })

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"))
    }

    return 1
  })

  const [total, setTotal] = useState(0)
  const [attendees, setAttendees] = useState<Attendee[]>([])
  
  const totalPages = Math.ceil(total / 10)

  useEffect(() => {
    const url = new URL("http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees")
    
    url.searchParams.set("pageIndex", String(page - 1))

    if (search.length > 0) {
      url.searchParams.set("query", search)
    }

    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAttendees(data.attendees)
        setTotal(data.total)
      })
  }, [page, search])

  const setCurrentSearch = (search: string) => {
    const url = new URL(window.location.toString())
  
    url.searchParams.set("search", search)

    window.history.pushState({}, "", url)

    setSearch(search)
  }
  
  const setCurrentPage = (page: number) => {
    const url = new URL(window.location.toString())
  
    url.searchParams.set("page", String(page))

    window.history.pushState({}, "", url)

    setPage(page)
  }

  const onSearchInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }


  const goToFirstPage = () => {
    setCurrentPage(1)
  }

  const goToLastPage = () => {
    setCurrentPage(totalPages)
  }

  const goToPreviusPage = () => {
    setCurrentPage(page - 1)

  }
  
  const goToNextPage = () => {
    setCurrentPage(page + 1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg text-sm flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent flex-1 outline-none border-0 p-0 h-auto text-sm focus:ring-0"
            type="text"
            placeholder="Buscar participantes..."
            onChange={onSearchInputChanged}
            value={search}
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 bg-black/20 border border-white/10 rounded"
              />
            </TableHeader>

            <TableHeader>Código</TableHeader>
            <TableHeader>Participantes</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }} />
          </tr>
        </thead>

        <tbody>
          {attendees.map((attendee) => {
            return (
              <TableRow key={attendee.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    className="size-4 bg-black/20 border border-white/10 rounded"
                  />
                </TableCell>
                <TableCell>{attendee.id}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-white font-semibold">{attendee.name}</span>
                    <span>{attendee.email.toLowerCase()}</span>
                  </div>
                </TableCell>
                <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                <TableCell>
                  {attendee.checkedInAt === null 
                    ? <span className="text-zinc-500">Não fez check-in</span> 
                    : dayjs().to(attendee.checkedInAt)}
                </TableCell>
                <TableCell>
                  <IconButton transparent>
                    <MoreHorizontal className="size-4" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando 10 de {total} itens
            </TableCell>
            <TableCell colSpan={3} className="text-right">
              <div className="inline-flex gap-8 items-center">
                <span>Página {page} de {totalPages}</span>

                <div className="flex gap-1.5">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>

                  <IconButton onClick={goToPreviusPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>

                  <IconButton onClick={goToNextPage}  disabled={page === totalPages}>
                    <ChevronRight className="size-4" />
                  </IconButton>

                  <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
};
