import { createIcon } from '@chakra-ui/icons'
import { Icon } from '@iconify/react';

export const IconeTeste = createIcon({
    displayName: "IconeTeste",
    viewBox: "0 0 200 200",
    path: (
        <Icon icon="game-icons:spiked-dragon-head" width="100%" height="100%" />
    )
})