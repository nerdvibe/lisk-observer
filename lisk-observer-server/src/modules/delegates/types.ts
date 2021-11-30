export interface Dpos {
    delegate: {
        username: string,
        pomHeights: any[],
        consecutiveMissedBlocks: number,
        lastForgedHeight: number,
        isBanned: boolean,
        totalVotesReceived: number,
        producedBlocks: number,
        rankAdjusted: number,
        rank: number,
        minActiveHeight: number
        isConsensusParticipant: boolean
        nextForgingTime: number
    },
    sentVotes: [
        {
            delegateAddress: string,
            amount: string
        }
    ],
    unlocking: any[]
}
