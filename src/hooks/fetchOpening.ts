"use server";

import prisma from "@/lib/prisma";
import { OpeningInfo } from "@/types/chess";

/**
 * Fetch an opening from the database based on the opening info.
 *
 * @param openingInfo the opening info to fetch
 * @returns the opening or { notFound: true } if not found
 */
export const fetchOpening = async (
  openingInfo: OpeningInfo,
): Promise<OpeningInfo & { notFound?: boolean }> => {
  try {
    /**
     * Find the opening by name, and select the name, eco, and pgn fields.
     */
    const opening = await prisma.opening.findFirst({
      where: {
        name: openingInfo.name,
      },
      select: {
        name: true,
        eco: true,
        pgn: true,
      },
    });

    /**
     * If the opening is found, return it. Otherwise, return { notFound: true }.
     */
    return opening || { notFound: true };
  } catch (error) {
    console.error("Error fetching opening:", error);
    /**
     * If there is an error, return { notFound: true }.
     */
    return { notFound: true };
  }
};
