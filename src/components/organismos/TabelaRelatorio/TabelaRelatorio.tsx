import { Grid, GridItem, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import CaixaPadronizada from "../../atomos/CaixaPadronizada/CaixaPadronizada";
import ColunaTabela from "../../../interface/ColunaTabela";

export default function TabelaRelatorio<T>(props: {columns: ColunaTabela[], items: T[]}){
    const columns: {header: string, property: string, size: string}[] = props.columns;
    const items = props.items;
    return (
        <Grid w='100%' h='100rem' templateRows='repeat(2, 1fr)'
                    templateColumns='repeat(1, 1fr)'
                    gap='50px'
                >
                <GridItem w='100%' h='100%' colSpan={4} paddingX='10'>
                    <CaixaPadronizada larguraCaixa='100%' alturaCaixa='100%'>
                        <>
                            <TableContainer>
                                <Table variant='striped' colorScheme='purple'>
                                    <Thead>
                                        <Tr>
                                            {
                                                columns.map(
                                                    (column)=>{
                                                        return (
                                                            <Th w={column.size}>
                                                                {column.header}
                                                            </Th>
                                                        );
                                                    }
                                                )
                                            }
                                        </Tr>
                                    </Thead>
                                    <Tbody  >
                                        {items.map((item, index) => (
                                            <Tr key={index}>
                                                {
                                                    columns.map(
                                                        (column) => {
                                                            return (
                                                                <Td whiteSpace={'wrap'} w={column.size}>
                                                                    {(item as any)[column.property]}
                                                                </Td>
                                                            )
                                                        }
                                                    )
                                                }
                                            </Tr>
                                        ))}
                                    </Tbody>
                                    <Tfoot>
                                    <Tr>
                                            {
                                                columns.map(
                                                    (column)=>{
                                                        return (
                                                            <Th>
                                                                {column.header}
                                                            </Th>
                                                        );
                                                    }
                                                )
                                            }
                                        </Tr>
                                    </Tfoot>
                                </Table>
                            </TableContainer>
                        </>
                    </CaixaPadronizada>
                </GridItem>
        </Grid >
            )
}