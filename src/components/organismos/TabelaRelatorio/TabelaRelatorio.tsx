import { Grid, GridItem, Table, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import ColunaTabela from "../../../interface/ColunaTabela";
import { useEffect, useState } from "react";

interface TabelaRelatorioProps<T> {
    columns: ColunaTabela[];
    items: T[];
}

export default function TabelaRelatorio<T>({ columns, items }: TabelaRelatorioProps<T>) {

    return (
        <Grid w="100%" h='0px' templateRows="repeat(2, 1fr)" templateColumns="repeat(1, 1fr)" gap="50px">
            <GridItem w="100%" h="100%" colSpan={4} paddingX="10">
                <TableContainer>
                    <Table variant="striped" colorScheme="purple">
                        <Thead>
                            <Tr>
                                {columns.map((column, index) => (
                                    <Th key={index} w={column.size}>
                                        {column.header}
                                    </Th>
                                ))}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {items.map((item, index) => (
                                <Tr key={index}>
                                    {columns.map((column, colIndex) => (
                                        <Td key={colIndex} whiteSpace="wrap" w={column.size}>
                                            {(item as any)[column.property]}
                                        </Td>
                                    ))}
                                </Tr>
                            ))}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                {columns.map((column, index) => (
                                    <Th key={index}>
                                        {column.header}
                                    </Th>
                                ))}
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            </GridItem>
        </Grid>
    );
}
