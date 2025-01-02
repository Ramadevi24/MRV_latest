import React, { createContext, useState, useEffect} from "react";
import { getEmissionSources, getEmissionSourceById, createEmissionSource, updateEmissionSource, deleteEmissionSource,} from '../services/EmissionSourceService';
import { toast } from 'react-toastify';

export const EmissionSourceContext = createContext();

export const EmissionSourceProvider = ({ children }) => {
    const [emissionSources, setEmissionSources] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchAllEmissionSources();
    }, []);


    const fetchAllEmissionSources = async () => {
        try {
            const data = await getEmissionSources();
            setEmissionSources(data);
            setLoading(false);
            } catch (error) {
                console.error('Error fetching emission sources:', error);
                setLoading(false);
                }
                };


    const fetchEmissionSourceById = async (id) => {
        try {
            setLoading(true);
            const emissionSource = await getEmissionSourceById(id);
            return emissionSource;
        } catch (error) {
            console.error('Error fetching emission source by id:', error);
        } finally {
            setLoading(false);
            }
            };


const addEmissionSource = async (emissionSourceData) => {
    try {
        setLoading(true);
        const newEmissionSource = await createEmissionSource(emissionSourceData);
        setEmissionSources((prevEmissionSource) =>[...prevEmissionSource, newEmissionSource]);
        return newEmissionSource;
        } catch (error) {
            throw new Error('Error creating emission source:', error);
            } finally {
                setLoading(false);
                }
                };


const editEmissionSource = async (id, emissionSourceData) => {
    try {
        setLoading(true);
        const updatedEmissionSource = await updateEmissionSource(id, emissionSourceData);
        setEmissionSources(emissionSources.map((emissionSource) =>
            emissionSource.id === id ? updatedEmissionSource : emissionSource) );
    } catch (error) {
        throw new Error('Error updating emission source:');
        } finally {
            setLoading(false);
            }
            };



            const removeEmissionSource = async (id) => {
                try {
                    await deleteEmissionSource(id);
                    setEmissionSources(emissionSources.filter((emissionSource) => emissionSource.id !== id));
                    toast.success("Emission source removed successfully");
                    } catch (error) {
                        toast.error('Error removing emission source');
                        }
                        };


                        return (
                            <EmissionSourceContext.Provider value ={{emissionSources, loading, fetchAllEmissionSources, fetchEmissionSourceById,
                                addEmissionSource,
                                editEmissionSource,
                                removeEmissionSource,
                            }}>{children}</EmissionSourceContext.Provider>
                        );
                    };